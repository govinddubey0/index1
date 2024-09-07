from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pymysql
import qrcode
import base64
from io import BytesIO
import random
import string

app = FastAPI()

# Configure CORS to allow communication with frontend
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MySQL Database connection details
def get_db_connection():
    connection = pymysql.connect(
        host='localhost',
        user='root',  # Your MySQL user
        password='12345678',  # Your MySQL password
        db='hospital_db',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection

# Pydantic model to validate input data
class Appointment(BaseModel):
    name: str
    phone: str
    email: str
    address: str
    dateInput: str
    time_slot: str
    service: str
    doctor_name: str

# Function to generate a random patient ID
def generate_patient_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

# Function to generate a QR code as a base64 image
def generate_qr_code(data: str):
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill='black', back_color='white')
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    qr_code_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return qr_code_base64

@app.post("/register")
async def register_appointment(appointment: Appointment):
    try:
        # Establish MySQL connection
        connection = get_db_connection()
        with connection.cursor() as cursor:
            # Generate patient ID
            patient_id = generate_patient_id()

            # SQL Query to insert the appointment data
            sql = """
            INSERT INTO appointments (name, phone, email, address, appointment_date, time_slot, service, doctor_name, patient_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (
                appointment.name,
                appointment.phone,
                appointment.email,
                appointment.address,
                appointment.dateInput,
                appointment.time_slot,
                appointment.service,
                appointment.doctor_name,
                patient_id
            ))

            # Commit the transaction
            connection.commit()

            # Generate QR code based on patient ID
            qr_code = generate_qr_code(f"Patient ID: {patient_id}")

            # Return the QR code as base64 and patient ID
            return {"qr_code": qr_code, "patient_id": patient_id}

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to register appointment")

    finally:
        connection.close()
