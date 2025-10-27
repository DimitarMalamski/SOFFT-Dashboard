package nl.fontys.s3.my_app.models.dtos.SalesOffer;

import nl.fontys.s3.my_app.models.SalesPerson;

public class SalesPersonDTO {
    private String uuid;
    private String name;
    private String email;
    private String phoneNumber;
    private int type;

    public SalesPersonDTO() {}
    public SalesPersonDTO(SalesPerson salesPerson) {
        this.uuid = salesPerson.getUuid();
        this.name = salesPerson.getName();
        this.email = salesPerson.getEmail();
        this.phoneNumber = salesPerson.getPhoneNumber();
        this.type = salesPerson.getType();
    }

    // Getters and setters
    public String getUuid() { return uuid; }
    public void setUuid(String uuid) { this.uuid = uuid; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public int getType() { return type; }
    public void setType(int type) { this.type = type; }
}
