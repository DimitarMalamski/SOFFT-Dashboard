package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "customer_company", schema = "dbo")
public class CustomerCompany {

    @Id
    @Column(name = "uuid", nullable = false, columnDefinition = "uniqueidentifier")
    private UUID uuid;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "vat_number", length = 64)
    private String vatNumber;

    @Column(name = "company_contact_id")
    private Integer companyContactId;

    // Getters and Setters
    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVatNumber() {
        return vatNumber;
    }

    public void setVatNumber(String vatNumber) {
        this.vatNumber = vatNumber;
    }

    public Integer getCompanyContactId() {
        return companyContactId;
    }

    public void setCompanyContactId(Integer companyContactId) {
        this.companyContactId = companyContactId;
    }
}
