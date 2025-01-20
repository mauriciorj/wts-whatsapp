import os
import boto3
import json
import uuid
from datetime import datetime
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
        response = supabase.from_("whatsapp").select('id, numbers,redirect_to, user_profile(is_subscription_active)').eq("link", link).execute()

        if len(response.data) and response.data[0]['user_profile']['is_subscription_active']:
            whatsapp_list = response.data[0]['numbers']
            current_index = response.data[0]['redirect_to'] or 0
            next_index = (current_index + 1) % len(whatsapp_list)
            
            supabase.table('whatsapp').update({'redirect_to': next_index}).eq('id', response.data[0]['id']).execute()

            # device_system = "ios"
            # if "$input.params('CloudFront-Is-Android-Viewer')" is True:
            #     device_system = "android"
            
            # device_size = "mobile"
            # if "$input.params('CloudFront-Is-Desktop-Viewer')" is True:
            #     device_size = "desktop"
            # if "$input.params('CloudFront-Is-Tablet-Viewer')" is True:
            #     device_size = "tablet"


            # const user_info = {
            #     "country": "$input.params('CloudFront-Viewer-Country')"
            #     "city": "$input.params('CloudFront-Viewer-City')"
            #     device_system: device_system,
            #     device_size: device_size
            # }

            now = datetime.now()

            # dynamoInfo = {
            #     "id": {"S": str(uuid.uuid4()) },
            #     "user_id": {"S": str(response.data[0]['id']) },
            #     "number": {"S": whatsapp_list[current_index]['number']},
            #     "country": {"S": "brazil"},
            #     "city": {"S": "rio de janeiro"},
            #     "created_at": {"S": now.isoformat()},
            #     "device_system": {"S": "ios"},
            #     "device_size": {"S": "mobile"},
            # }

            dynamoInfo = {
                "id": str(uuid.uuid4()),
                "user_id": str(response.data[0]['user_id']),
                "number": whatsapp_list[current_index]['number'],
                "country": "brazil",
                "city": "rio de janeiro",
                "device_system": "ios",
                "device_size": "mobile",
            }


            try:
                # Function to use DynamoDB
                # dynamo_client = boto3.client('dynamodb')
                # dynamoResponse = dynamo_client.put_item(TableName="whatsapp_tracking", Item=dynamoInfo)

                response = supabase.table("whatsapp_tracking").insert(dynamoInfo).execute()

                print('')
                print('response')
                print(response)
            except Exception as e:
                return {
                    "statusCode": 500,
                    "body": json.dumps({"error": str(e)})
                }
            

            
            # Return query result
            return {
                "statusCode": 200,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"whatsapp": whatsapp_list[current_index]})
            }

        return {
            "statusCode": 500,
            "body": json.dumps({"error": "O link não foi encontrado"})
        }
            
            
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
