package nl.fontys.s3.my_app.model;


import jakarta.persistence.*;

@Entity
@Table(name = "sales_offer_sales_person", schema = "dbo")
public class SalesOfferSalesPerson {

    @EmbeddedId
    private SalesOfferSalesPersonId id;

    @ManyToOne
    @MapsId("offerUuid") // maps offerUuid from composite key
    @JoinColumn(name = "offer_uuid")
    private SalesOffer salesOffer;

    @ManyToOne
    @MapsId("salespersonUuid") // maps salespersonUuid from composite key
    @JoinColumn(name = "salesperson_uuid")
    private SalesPerson salesPerson;

    // Getters & Setters
    public SalesOfferSalesPersonId getId() {
        return id;
    }

    public void setId(SalesOfferSalesPersonId id) {
        this.id = id;
    }

    public SalesOffer getSalesOffer() {
        return salesOffer;
    }

    public void setSalesOffer(SalesOffer salesOffer) {
        this.salesOffer = salesOffer;
    }

    public SalesPerson getSalesPerson() {
        return salesPerson;
    }

    public void setSalesPerson(SalesPerson salesPerson) {
        this.salesPerson = salesPerson;
    }
}