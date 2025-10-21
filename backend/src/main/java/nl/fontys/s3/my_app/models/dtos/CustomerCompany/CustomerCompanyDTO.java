package nl.fontys.s3.my_app.models.dtos.CustomerCompany;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonRootName;

import nl.fontys.s3.my_app.models.CustomerCompany;

@JsonRootName("data")
public class CustomerCompanyDTO {
    private String uuid;
    private String name;
    private String vatNumber;
    private int companyContactId;
    private List<CompanyAddressDTO> adresses;
    private List<CompanyPersonDTO> persons;

    public CustomerCompanyDTO() {
    }

    public CustomerCompanyDTO(CustomerCompany customerCompany, List<CompanyAddressDTO> companyAddresses,
            List<CompanyPersonDTO> companyPersons) {
        this.uuid = customerCompany.getUuid();
        this.name = customerCompany.getName();
        this.vatNumber = customerCompany.getVatNumber();
        this.companyContactId = customerCompany.getCompanyContactId();
        this.adresses = companyAddresses;
        this.persons = companyPersons;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
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

    public int getCompanyContactId() {
        return companyContactId;
    }

    public void setCompanyContactId(int companyContactId) {
        this.companyContactId = companyContactId;
    }

    public List<CompanyAddressDTO> getAdresses() {
        return adresses;
    }

    public void setAdresses(List<CompanyAddressDTO> adresses) {
        this.adresses = adresses;
    }

    public List<CompanyPersonDTO> getPersons() {
        return persons;
    }

    public void setPersons(List<CompanyPersonDTO> persons) {
        this.persons = persons;
    }

}
