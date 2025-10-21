package nl.fontys.s3.my_app.models.dtos.CustomerCompany;


import nl.fontys.s3.my_app.models.CompanyAddress;

public class CompanyAddressDTO {
    private String uuid;
    private String companyName;
    private int contactAddressId;
    private String countryCode;
    private String city;
    private String street;
    private String zipCode;
    private String area;
    private int type;

    public CompanyAddressDTO() {
    }

    public CompanyAddressDTO(CompanyAddress companyAddress) {
        this.uuid = companyAddress.getUuid();
        this.companyName = companyAddress.getCompanyName();
        this.contactAddressId = companyAddress.getContactAddressId();
        this.countryCode = companyAddress.getCountryCode();
        this.city = companyAddress.getCity();
        this.street = companyAddress.getStreet();
        this.zipCode = companyAddress.getZipCode();
        this.area = companyAddress.getArea();
        this.type = companyAddress.getType();
    }

    public static CompanyAddressDTO fromEntity(CompanyAddress a) {
        return new CompanyAddressDTO(a);
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getContactAddressId() {
        return contactAddressId;
    }

    public void setContactAddressId(int contactAddressId) {
        this.contactAddressId = contactAddressId;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
