package nl.fontys.s3.my_app.models.dtos.SalesOfferSimple;

public class SalesOfferLineSimpleDTO {
    private ProductSimpleDTO product;
    private DeliverySimpleDTO delivery;

    public SalesOfferLineSimpleDTO() {
    }

    public SalesOfferLineSimpleDTO(ProductSimpleDTO product, DeliverySimpleDTO delivery) {
        this.product = product;
        this.delivery = delivery;
    }
    
    public ProductSimpleDTO getProduct() {
        return product;
    }
    public void setProduct(ProductSimpleDTO product) {
        this.product = product;
    }
    public DeliverySimpleDTO getDelivery() {
        return delivery;
    }
    public void setDelivery(DeliverySimpleDTO delivery) {
        this.delivery = delivery;
    }

}
