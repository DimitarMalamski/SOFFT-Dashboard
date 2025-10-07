package nl.fontys.s3.my_app.models.dtos.CustomerCompany;

import java.util.UUID;

import nl.fontys.s3.my_app.models.CompanyPerson;

public class CompanyPersonDTO {
    private UUID uuid;
    private String name;
    private String email;
    private String phoneNumber;
    private int personContactId;

    public CompanyPersonDTO() {
    }

    public CompanyPersonDTO(CompanyPerson companyPerson) {

        this.uuid = companyPerson.getUuid();
        this.name = companyPerson.getName();
        this.email = companyPerson.getEmail();
        this.phoneNumber = companyPerson.getPhoneNumber();
        this.personContactId = companyPerson.getPersonContactId();
    }

    public static CompanyPersonDTO fromEntity(CompanyPerson p) {
        return new CompanyPersonDTO(p);
    }

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

    public int getPersonContactId() {
        return personContactId;
    }

    public void setPersonContactId(int personContactId) {
        this.personContactId = personContactId;
    }
}
