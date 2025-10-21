package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@IdClass(SalesOfferSalesPersonId.class)
@Table(name = "sales_offer_sales_person", schema = "dbo")
public class SalesOfferSalesPerson {

    @Id
    @Column(name = "offer_uuid", nullable = false, columnDefinition = "char(36)")
    private String offerUuid;

    @Id
    @Column(name = "salesperson_uuid", nullable = false, columnDefinition = "char(36)")
    private String salesPersonUuid;

    // Getters and Setters
    public String getOfferUuid() {
        return offerUuid;
    }

    public void setOfferUuid(String offerUuid) {
        this.offerUuid = offerUuid;
    }

    public String getSalespersonUuid() {
        return salesPersonUuid;
    }

    public void setSalespersonUuid(String salesPersonUuid) {
        this.salesPersonUuid = salesPersonUuid;
    }

}
