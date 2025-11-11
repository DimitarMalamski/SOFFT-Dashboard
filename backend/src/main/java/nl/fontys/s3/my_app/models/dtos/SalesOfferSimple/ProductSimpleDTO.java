package nl.fontys.s3.my_app.models.dtos.SalesOfferSimple;

public class ProductSimpleDTO {
    private String brand;
    private String productType;

    public ProductSimpleDTO() {
    }
    public ProductSimpleDTO(String brand, String productType) {
        this.brand = brand;
        this.productType = productType;
    }
    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }
    public String getProductType() {
        return productType;
    }
    public void setProductType(String productType) {
        this.productType = productType;
    }
    
}
