import os
import json
from supabase import create_client

# Initialize Supabase client using environment variables
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_API_KEY = os.environ.get("SUPABASE_API_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_API_KEY)

def lambda_handler(event, context):
    # Extract path parameter (e.g., "AAAA" from "/AAAA")
    link = event.get("rawPath", "/").lstrip("/")
    
    try:
        # Query the "whatsapp" table in Supabase
        response = supabase.table("whatsapp").select("*").eq("link", link).execute()
        
        if response.error:
            return {
                "statusCode": 500,
                "body": json.dumps({"error": response.error.message})
            }
        
        # Return query result
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(response.data)  # Return data as JSON
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
