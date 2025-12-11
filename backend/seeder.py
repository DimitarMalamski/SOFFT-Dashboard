import pyodbc
import uuid
import random
import argparse
import time
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

# Connection String
connection_string = (
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=mssqlstud.fhict.local;"
    "DATABASE=dbi481970;"
    "Encrypt=yes;"
    "TrustServerCertificate=yes;"
    "UID=dbi481970;"
    "PWD=app;"
)

STATUS_MAP = {
    0: "Pending",
    1: "Approved",
    2: "Accepted",
    3: "Declined"
}

def gen_uuid(): return str(uuid.uuid4())
def random_currency(): return random.choice(["EUR", "USD", "GBP"])
def random_country(): return random.choice(["NL", "DE", "FR", "BE", "ES", "IT", "CN", "US"])
def random_status_pair():
    code = random.choice(list(STATUS_MAP.keys()))
    return code, STATUS_MAP[code]

NUM_COMPANIES = 1

#  ARGUMENT PARSER 

parser = argparse.ArgumentParser()
parser.add_argument("--loop", type=int, help="Loop seeding every X seconds", default=None)
args = parser.parse_args()


def seed_once():
    conn = pyodbc.connect(connection_string)
    cursor = conn.cursor()

    # Create a single global pool of salespersons
    type_map = {"internal": 1, "external": 2, "partner": 3}
    salespersons = []

    for _ in range(10):
        sp_uuid = gen_uuid()
        cursor.execute("""
            INSERT INTO sales_person (uuid, ext_id, name, email, phone_number, type)
            VALUES (?, ?, ?, ?, ?, ?)
        """, sp_uuid,
           random.randint(1000, 9999),
           fake.name(),
           fake.email(),
           fake.phone_number(),
           type_map[random.choice(list(type_map.keys()))]
        )
        salespersons.append(sp_uuid)

    conn.commit()

    # MAIN COMPANY LOOP
    for _ in range(NUM_COMPANIES):

        company_uuid = gen_uuid()
        company_name = fake.company()

        cursor.execute("""
            INSERT INTO customer_company (uuid, name, vat_number, company_contact_id)
            VALUES (?, ?, ?, ?)
        """, company_uuid, company_name,
           f"NL{random.randint(100000000,999999999)}B01",
           random.randint(1000,999999)
        )

        # FIX: Ensure single main company address

        address_uuid = gen_uuid()
        cursor.execute("""
            INSERT INTO company_address (
                uuid, company_uuid, company_name, contact_address_id,
                country_code, city, street, zip_code, area, type
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, address_uuid, company_uuid, company_name,
           random.randint(1000,9999), random_country(), fake.city(),
           fake.street_address(), fake.postcode(), "EU", 0
        )

        # Insert Company Person(s)
        for _ in range(random.randint(1, 3)):
            cursor.execute("""
                INSERT INTO company_person (uuid, company_uuid, name, email, phone_number, person_contact_id)
                VALUES (?, ?, ?, ?, ?, ?)
            """,
                gen_uuid(), company_uuid,
                fake.first_name(), fake.email(),
                fake.phone_number(), random.randint(10000,99999)
            )

        # Sales Offer
        offer_uuid = gen_uuid()
        status_code, status_desc = random_status_pair()

        cursor.execute("""
            INSERT INTO sales_offer (
                uuid, customer_uuid, reference_id, ticket_id, status_code, status_description,
                currency, exchange_rate, created_at, updated_at, expires_at,
                total_price_ex_vat_amt, total_price_ex_vat_ccy,
                items_total_amt, discount_amt, discount_ccy, tax_amt
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
           offer_uuid, company_uuid,
           str(random.randint(10000000,99999999)),
           random.randint(100000,999999),
           status_code, status_desc,
           random_currency(), round(random.uniform(0.8,1.2),4),
           datetime.now() - timedelta(days=random.randint(1,30)),
           datetime.now(),
           datetime.now() + timedelta(days=random.randint(7,30)),
           round(random.uniform(10000,90000),2), random_currency(),
           round(random.uniform(8000,85000),2),
           round(random.uniform(0,5000),2), random_currency(),
           round(random.uniform(500,9000),2)
        )

        # Product (capture inserted identity properly)
        cursor.execute("""
            INSERT INTO product (
                truck_id, product_type, brand, model, type_code, configuration,
                image_url, status, color, first_registration_date, production_date,
                mileage, engine_power, license_plate, vin
            ) OUTPUT INSERTED.id
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
           random.randint(10000,99999), random.choice(["Truck","Trailer","Van"]),
           fake.company(), fake.word().upper(), "P94", "6x2",
           "https://example.com/image.png", random.randint(0,2),
           random.choice(["red","blue","black","white"]),
           datetime.now().date(),
           datetime.now().date() - timedelta(days=random.randint(200,1000)),
           random.randint(10000,200000),
           round(random.uniform(100,600),2),
           fake.license_plate(),
           fake.bothify(text="??########")
        )
        product_id = cursor.fetchone()[0]

        # Depot + Address
        depot_addr_uuid = gen_uuid()
        cursor.execute("""
            INSERT INTO address (uuid, company_name, country_code, city, street, zip_code, area, contact_address_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, depot_addr_uuid, company_name, random_country(), fake.city(),
           fake.street_address(), fake.postcode(), "EU", random.randint(1000,9999)
        )

        cursor.execute("""
            INSERT INTO depot (name, address_uuid)
            OUTPUT INSERTED.id
            VALUES (?, ?)
        """, f"{fake.city()} Depot", depot_addr_uuid)
        depot_id = cursor.fetchone()[0]

        # Delivery addresses
        from_addr = gen_uuid()
        to_addr = gen_uuid()

        for addr in [from_addr, to_addr]:
            cursor.execute("""
                INSERT INTO address (uuid, company_name, country_code, city, street, zip_code, area, contact_address_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, addr, company_name, random_country(), fake.city(),
               fake.street_address(), fake.postcode(), "EU", random.randint(100,999)
            )

        # Delivery
        delivery_uuid = gen_uuid()
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
            random.choice(["CIP","CIF","EXW"]), random.randint(1,10),
            round(random.uniform(500,10000),2), round(random.uniform(500,12000),2),
            random_country(), random.choice([0,1]),
            from_addr, to_addr,
            random_country(), fake.city(), fake.street_address(), fake.postcode(),
            random_country(), fake.city(), fake.street_address(), fake.postcode()
        )

        # Offer Line
        line_uuid = gen_uuid()
        cursor.execute("""
            INSERT INTO sales_offer_line (
                line_uuid, offer_uuid, product_id, delivery_uuid, status_code,
                reserved_until, financing_type, is_product_seen_physically,
                leasing_company_id, is_deposit_applicable, vat_rate_percent,
                product_price_amt, product_price_ccy, note
            )
            OUTPUT INSERTED.id
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
           line_uuid, offer_uuid, product_id, delivery_uuid,
           random.randint(0,2),
           datetime.now() + timedelta(days=random.randint(1,5)),
           random.randint(1,10),
           random.choice([0,1]),
           random.randint(100,999),
           random.choice([0,1]),
           round(random.uniform(10,60),2),
           round(random.uniform(5000,100000),2),
           random_currency(),
           fake.sentence()
        )

        offer_line_id = cursor.fetchone()[0]

        # Extras (correct identity reference)
        for _ in range(random.randint(0,3)):
            cursor.execute("""
                INSERT INTO sales_offer_line_extra (
                    line_id, extra_type, label, text,
                    original_price_amt, original_price_ccy,
                    price_amt, price_ccy
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
               offer_line_id,
               random.choice(["document","service","product","other"]),
               fake.word().capitalize(),
               fake.sentence(),
               round(random.uniform(100,10000),2), random_currency(),
               round(random.uniform(100,10000),2), random_currency()
            )

        # Link salespersons (fixed!)
        assigned = random.sample(salespersons, random.randint(1, 3))
        for sp in assigned:
            cursor.execute("""
                INSERT INTO sales_offer_sales_person (offer_uuid, salesperson_uuid)
                VALUES (?, ?)
            """, offer_uuid, sp)

        conn.commit()

    conn.close()
    print(f"[OK] Inserted {NUM_COMPANIES} companies.")


#  LOOP MODE

if args.loop:
    print(f"Loop mode enabled: inserting every {args.loop} seconds.\n")
    while True:
        seed_once()
        time.sleep(args.loop)
else:
    seed_once()
    print("Done.")
