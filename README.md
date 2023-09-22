"# hospital-api" 
access using POSTMAN https://hospital-api-production-b1d9.up.railway.app/

- https://hospital-api-production-b1d9.up.railway.app/api/v1/doctors/register → with username and password
- https://hospital-api-production-b1d9.up.railway.app/api/v1/doctors/login → returns the JWT to be used
- https://hospital-api-production-b1d9.up.railway.app/api/v1/patients/register
- https://hospital-api-production-b1d9.up.railway.app/api/v1/patients/:id/create_report
- https://hospital-api-production-b1d9.up.railway.app/api/v1/patients/:id/all_reports → List all the reports of a patient oldest to latest
- https://hospital-api-production-b1d9.up.railway.app/api/v1/reports/:status → List all the reports of all the patients filtered by a specific status

npm start to run--------------
- /doctors/register → with username and password
- /doctors/login → returns the JWT to be used
- /patients/register
- /patients/:id/create_report
- /patients/:id/all_reports → List all the reports of a patient oldest to latest
- /reports/:status → List all the reports of all the patients filtered by a specific status
