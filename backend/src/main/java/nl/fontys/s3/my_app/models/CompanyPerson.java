package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "company_person", schema = "dbo")
public class CompanyPerson {

    @Id
    @Column(name = "uuid", nullable = false, columnDefinition = "char(36)")
    private String uuid;

    @Column(name = "company_uuid", columnDefinition = "char(36)")
    private String companyUuid;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "email", length = 255)
    private String email;

    @Column(name = "phone_number", length = 64)
    private String phoneNumber;

    @Column(name = "person_contact_id")
    private Integer personContactId;

    // Getters and Setters
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getCompanyUuid() {
        return companyUuid;
    }

    public void setCompanyUuid(String companyUuid) {
        this.companyUuid = companyUuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getPersonContactId() {
        return personContactId;
    }

    public void setPersonContactId(Integer personContactId) {
        this.personContactId = personContactId;
    }
}
