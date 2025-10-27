package nl.fontys.s3.my_app.models.dtos.SalesOffer;

public class CompanyDTO {
    private String uuid;


    public CompanyDTO(String uuid) {
        this.uuid = uuid;
    }

    public CompanyDTO() {
    }


    public String getUuid() {
        return uuid;
    }
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
}
