# Biocomputing-Circuit-Designer

### Running django website

Under some operating systems, you might need to replace all python and pip commands with python3 and pip3

1. Clone this repo and cd into it
2. Install virtualenv with "python -m pip install --user virtualenv"
3. Create a new environment with "virtualenv djangoEnv"
4. Activate environment 
   - Linx/Mac : "source  djangoEnv/bin/activate"
   - Windows : "djangoEnv/Scripts\activate"
5. Install required libraries with "pip install -r requirements.txt"
6. Under website/biocomputingWebsite/biocomputingWebsite make a secrets.json file to setup a secret key. You can use secretsTemplate.json as a reference (but don't delete it)
7. Under website/biocomputingWebsite, start the server with "python manage.py runserver"
