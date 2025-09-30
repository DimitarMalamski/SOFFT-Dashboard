package nl.fontys.s3.my_app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer_company")
public class CustomerCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uuid", columnDefinition = "uniqueidentifier")
    private java.util.UUID uuid;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "vat_number", nullable = false, length = 255)
    private String vatNumber;

    public java.util.UUID getUuid() {
        return this.uuid;
    }

    public void setUuid(java.util.UUID uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVatNumber() {
        return this.vatNumber;
    }

    public void setVatNumber(String vatNumber) {
        this.vatNumber = vatNumber;
    }
}