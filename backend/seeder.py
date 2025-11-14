import pyodbc
import uuid
import random
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

# Connection String
# spring.datasource.url=jdbc:sqlserver://mssqlstud.fhict.local;databaseName=dbi481970;encrypt=true;trustServerCertificate=true
connection_string = (
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=mssqlstud.fhict.local;"
    "DATABASE=dbi481970;"
    "Encrypt=yes;"
    "TrustServerCertificate=yes;"
    "UID=dbi481970;"
    "PWD=app;"
)

conn = pyodbc.connect(connection_string)
cursor = conn.cursor()

STATUS_MAP = {
    0: "Pending",
    1: "Approved",
    2: "Completed",
    3: "Declined"
}

def gen_uuid():
    return str(uuid.uuid4())

def random_currency():
    return random.choice(["EUR", "USD", "GBP"])

def random_country():
    return random.choice(["NL", "DE", "FR", "BE", "ES", "IT", "CN", "US"])

def random_status():
    return random.choice([0, 1, 2])

def random_status_pair():
    code = random.choice(list(STATUS_MAP.keys()))
    return code, STATUS_MAP[code]

# --- SEED DATA ---
NUM_COMPANIES = 50

for _ in range(NUM_COMPANIES):
    company_uuid = gen_uuid()
    company_name = fake.company()
    vat = f"NL{random.randint(100000000,999999999)}B01"
    company_contact_id = random.randint(1000, 999999)

    # Insert Customer Company
    cursor.execute("""
        INSERT INTO customer_company (uuid, name, vat_number, company_contact_id)
        VALUES (?, ?, ?, ?)
    """, company_uuid, company_name, vat, company_contact_id)

    # Insert Company Address
    for _ in range(random.randint(1, 2)):
        address_uuid = gen_uuid()
        cursor.execute("""
            INSERT INTO company_address (
                uuid, company_uuid, company_name, contact_address_id,
                country_code, city, street, zip_code, area, type
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, address_uuid, company_uuid, company_name, random.randint(1000,9999),
             random_country(), fake.city(), fake.street_address(),
             fake.postcode(), "EU", random.randint(0, 2))

    # Insert Company Person
    for _ in range(random.randint(1, 3)):
        person_uuid = gen_uuid()
        cursor.execute("""
            INSERT INTO company_person (uuid, company_uuid, name, email, phone_number, person_contact_id)
            VALUES (?, ?, ?, ?, ?, ?)
        """, person_uuid, company_uuid, fake.first_name(), fake.email(),
             fake.phone_number(), random.randint(10000,99999))

    # Insert Sales Offer
    offer_uuid = gen_uuid()
    status_code, status_description = random_status_pair()

    cursor.execute("""
        INSERT INTO sales_offer (
            uuid, customer_uuid, reference_id, ticket_id, status_code, status_description,
            currency, exchange_rate, created_at, updated_at, expires_at,
            total_price_ex_vat_amt, total_price_ex_vat_ccy,
            items_total_amt, discount_amt, discount_ccy, tax_amt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """,
        offer_uuid, company_uuid, str(random.randint(10000000,99999999)),
        random.randint(100000,999999),
        status_code, status_description,
        random_currency(), round(random.uniform(0.8, 1.2), 4),
        datetime.now() - timedelta(days=random.randint(1,30)),
        datetime.now(), datetime.now() + timedelta(days=random.randint(7,30)),
        round(random.uniform(10000, 90000),2), random_currency(),
        round(random.uniform(8000, 85000),2),
        round(random.uniform(0, 5000),2), random_currency(),
        round(random.uniform(500, 9000),2)
    )

    # Create Product
    product_id = None
    cursor.execute("""
        INSERT INTO product (
            truck_id, product_type, brand, model, type_code, configuration,
            image_url, status, color, first_registration_date, production_date,
            mileage, engine_power, license_plate, vin
        ) OUTPUT INSERTED.id
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, random.randint(10000,99999), random.choice(["Truck", "Trailer", "Van"]),
         fake.company(), fake.word().upper(), "P94", "6x2",
         "https://example.com/image.png", random_status(), random.choice(["red", "blue", "black", "white"]),
         datetime.now().date(), datetime.now().date() - timedelta(days=random.randint(200,1000)),
         random.randint(10000, 200000), round(random.uniform(100, 600),2),
         fake.license_plate(), fake.bothify(text="??########")
    )
    product_id = cursor.fetchone()[0]

    # Create Depot + Address for Depot
    depot_addr_uuid = gen_uuid()
    cursor.execute("""
        INSERT INTO address (
            uuid, company_name, country_code, city, street, zip_code, area, contact_address_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, depot_addr_uuid, company_name, random_country(), fake.city(),
         fake.street_address(), fake.postcode(), "EU", random.randint(1000,9999))
    
    cursor.execute("""
        INSERT INTO depot (name, address_uuid)
        OUTPUT INSERTED.id
        VALUES (?, ?)
    """, f"{fake.city()} Depot", depot_addr_uuid)
    depot_id = cursor.fetchone()[0]

    # Create Address for Delivery
    from_addr_uuid = gen_uuid()
    cursor.execute("""
        INSERT INTO address (
            uuid, company_name, country_code, city, street, zip_code, area, contact_address_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, from_addr_uuid, company_name, random_country(), fake.city(),
         fake.street_address(), fake.postcode(), "EU", random.randint(100,999))

    # Delivery with full shipping details
    delivery_uuid = gen_uuid()

    # Create TO address for Delivery
    to_addr_uuid = gen_uuid()
    cursor.execute("""
        INSERT INTO address (
            uuid, company_name, country_code, city, street, zip_code, area, contact_address_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, to_addr_uuid, company_name, random_country(), fake.city(),
         fake.street_address(), fake.postcode(), "EU", random.randint(100,999))

    cursor.execute("""
        INSERT INTO delivery (
            uuid, incoterm, transport_days, original_price, price, destination_country_code,
            is_custom_address, from_address_uuid, to_address_uuid,
            shipping_loading_country_code, shipping_loading_city, shipping_loading_street, shipping_loading_zip_code,
            shipping_dest_country_code, shipping_dest_city, shipping_dest_street, shipping_dest_zip_code
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """,
        delivery_uuid,
        random.choice(["CIP", "CIF", "EXW"]), random.randint(1, 10),
        round(random.uniform(500, 10000), 2), round(random.uniform(500, 12000), 2),
        random_country(), random.choice([0, 1]), from_addr_uuid, to_addr_uuid,
        random_country(), fake.city(), fake.street_address(), fake.postcode(),
        random_country(), fake.city(), fake.street_address(), fake.postcode()
    )

    # Insert Sales Offer Line
    line_uuid = gen_uuid()
    cursor.execute("""
        INSERT INTO sales_offer_line (
            line_uuid, offer_uuid, product_id, delivery_uuid, status_code,
            reserved_until, financing_type, is_product_seen_physically,
            leasing_company_id, is_deposit_applicable, vat_rate_percent,
            product_price_amt, product_price_ccy, note
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, line_uuid, offer_uuid, product_id, delivery_uuid,
         random_status(), datetime.now() + timedelta(days=random.randint(1,5)),
         random.randint(1,10), random.choice([0,1]), random.randint(100,999),
         random.choice([0,1]), round(random.uniform(10, 60),2),
         round(random.uniform(5000, 100000),2), random_currency(), fake.sentence())

    # Each product has a single seller (linked to a depot + address)
    seller_addr_uuid = gen_uuid()
    cursor.execute("""
        INSERT INTO address (
            uuid, company_name, country_code, city, street, zip_code, area, contact_address_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, seller_addr_uuid, company_name, random_country(), fake.city(),
        fake.street_address(), fake.postcode(), "EU", random.randint(1000,9999))

    cursor.execute("""
        INSERT INTO product_seller (
            product_id, company_name, depot_id, deposit_percent, deposit_min_amount,
            is_allow_to_pickup, is_allow_to_view, address_uuid
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, product_id, company_name, depot_id,
        round(random.uniform(2, 10), 2), round(random.uniform(100, 1000), 2),
        random.choice([0, 1]), random.choice([0, 1]), seller_addr_uuid)


    # Link this offer to the depot(s) created earlier
    cursor.execute("""
        INSERT INTO sales_offer_depot (offer_uuid, depot_id)
        VALUES (?, ?)
    """, offer_uuid, depot_id)

    # Each offer may have 0–2 related orders
    for _ in range(random.randint(0, 2)):
        cursor.execute("""
            INSERT INTO sales_offer_order (offer_uuid, order_id, created_at)
            VALUES (?, ?, ?)
        """, offer_uuid, random.randint(100000, 999999),
            datetime.now() - timedelta(days=random.randint(0, 30)))


    # Each offer line may have 0–3 extras
    num_extras = random.randint(0, 3)
    for _ in range(num_extras):
        cursor.execute("""
            INSERT INTO sales_offer_line_extra (
                line_id, extra_type, label, text,
                original_price_amt, original_price_ccy,
                price_amt, price_ccy
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, cursor.execute("SELECT IDENT_CURRENT('sales_offer_line')").fetchval(),
            random.choice(["document", "service", "product", "other"]),
            fake.word().capitalize(),
            fake.sentence(),
            round(random.uniform(100, 10000), 2), random_currency(),
            round(random.uniform(100, 10000), 2), random_currency())

    # Sales Person
    type_map = {"internal": 1, "external": 2, "partner": 3}

    salespersons = []
    for _ in range(10):  # create a small global pool of 10 salespersons
        sp_uuid = gen_uuid()
        cursor.execute("""
            INSERT INTO sales_person (uuid, ext_id, name, email, phone_number, type)
            VALUES (?, ?, ?, ?, ?, ?)
        """, sp_uuid,
            random.randint(1000, 9999),  
            fake.name(),
            fake.email(),
            fake.phone_number(),
            type_map[random.choice(list(type_map.keys()))]) 
        salespersons.append(sp_uuid)

    # Each offer gets 1–3 assigned salespersons
    for offer in cursor.execute("SELECT uuid FROM sales_offer").fetchall():
        offer_uuid = offer[0]
        assigned = random.sample(salespersons, random.randint(1, 3))
        for sp_uuid in assigned:
            cursor.execute("""
                INSERT INTO sales_offer_sales_person (offer_uuid, salesperson_uuid)
                VALUES (?, ?)
            """, offer_uuid, sp_uuid)

conn.commit()
conn.close()
print("Database seeding complete! 50 companies + related data inserted.")
