import os
import json
import urllib.parse
from supabase import create_client

# Initialize Supabase client using environment variables
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_API_KEY = os.environ.get("SUPABASE_API_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_API_KEY)

def lambda_handler(event, context):
    # Extract path parameter (e.g., "AAAA" from "/AAAA")
    link = event.get("rawPath", "/").lstrip("/")

    try:
        # Query the "whatsapp" table in Supabase inner join to user_profile
        response = supabase.from_("whatsapp").select('id, numbers,redirect_to, user_id, user_profile(is_subscription_active)').eq("link", link).execute()

        if len(response.data) > 0 and response.data[0]['user_profile']['is_subscription_active'] is True:
            whatsapp_list = response.data[0]['numbers']
            current_index = response.data[0]['redirect_to'] or 0
            next_index = (current_index + 1) % len(whatsapp_list)

            supabase.table('whatsapp').update({'redirect_to': next_index}).eq('id', response.data[0]['id']).execute()

            trackingInfo = {
                "user_id": response.data[0]['user_id'],
                "number": whatsapp_list[current_index]['number'],
                "country": "brazil",
                "city": "rio de janeiro",
                "device_system": "ios",
                "device_size": "mobile",
                "link": link
            }

            try:
                response = supabase.table("whatsapp_tracking").insert(trackingInfo).execute()

            except Exception as e:
                return {
                    "statusCode": 500,
                    "body": json.dumps({"error 000": str(e)})
                }


            whatsapp_link = ''

            if whatsapp_list[current_index]['message'] is None:
                whatsapp_link = 'https://wa.me/' + whatsapp_list[current_index]['number']
            else:
                msg_encoded = urllib.parse.quote_plus(whatsapp_list[current_index]['message'])
                whatsapp_link = 'https://wa.me/' + whatsapp_list[current_index]['number'] + '?text=' + msg_encoded

            return {
                "headers": {"Location": whatsapp_link },
                "statusCode": 302,
            }
            
        return {
            "statusCode": 500,
            "body": json.dumps({"error 111": "O link não foi encontrado"})
        }
            
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error 222": str(e)})
        }
