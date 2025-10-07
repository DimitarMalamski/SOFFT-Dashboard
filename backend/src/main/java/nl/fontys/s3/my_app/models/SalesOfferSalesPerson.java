package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "sales_offer_sales_person", schema = "dbo")
@IdClass(SalesOfferSalesPerson.SalesOfferSalesPersonId.class)
public class SalesOfferSalesPerson {

    @Id
    @Column(name = "offer_uuid", nullable = false, columnDefinition = "uniqueidentifier")
    private UUID offerUuid;

    @Id
    @Column(name = "salesperson_uuid", nullable = false, columnDefinition = "uniqueidentifier")
    private UUID salespersonUuid;

    // Getters and Setters
    public UUID getOfferUuid() {
        return offerUuid;
    }

    public void setOfferUuid(UUID offerUuid) {
        this.offerUuid = offerUuid;
    }

    public UUID getSalespersonUuid() {
        return salespersonUuid;
    }

    public void setSalespersonUuid(UUID salespersonUuid) {
        this.salespersonUuid = salespersonUuid;
    }

    // Composite Key Class
    public static class SalesOfferSalesPersonId implements Serializable {
        private UUID offerUuid;
        private UUID salespersonUuid;

        public SalesOfferSalesPersonId() {
        }

        public SalesOfferSalesPersonId(UUID offerUuid, UUID salespersonUuid) {
            this.offerUuid = offerUuid;
            this.salespersonUuid = salespersonUuid;
        }

        public UUID getOfferUuid() {
            return offerUuid;
        }

        public void setOfferUuid(UUID offerUuid) {
            this.offerUuid = offerUuid;
        }

        public UUID getSalespersonUuid() {
            return salespersonUuid;
        }

        public void setSalespersonUuid(UUID salespersonUuid) {
            this.salespersonUuid = salespersonUuid;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (!(o instanceof SalesOfferSalesPersonId))
                return false;
            SalesOfferSalesPersonId that = (SalesOfferSalesPersonId) o;
            return offerUuid.equals(that.offerUuid) && salespersonUuid.equals(that.salespersonUuid);
        }

        @Override
        public int hashCode() {
            return offerUuid.hashCode() + salespersonUuid.hashCode();
        }
    }
}
