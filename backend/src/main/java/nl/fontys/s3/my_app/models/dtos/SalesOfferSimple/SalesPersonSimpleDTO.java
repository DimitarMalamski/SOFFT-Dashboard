package nl.fontys.s3.my_app.models.dtos.SalesOfferSimple;

public class SalesPersonSimpleDTO {
    private String name;

    public SalesPersonSimpleDTO() {
    }
    public SalesPersonSimpleDTO(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
}
