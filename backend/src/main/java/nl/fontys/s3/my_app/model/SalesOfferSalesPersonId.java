package nl.fontys.s3.my_app.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class SalesOfferSalesPersonId implements Serializable {

    private UUID offerUuid;
    private UUID salespersonUuid;

    public SalesOfferSalesPersonId() {}

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
        if (this == o) return true;
        if (!(o instanceof SalesOfferSalesPersonId)) return false;
        SalesOfferSalesPersonId that = (SalesOfferSalesPersonId) o;
        return Objects.equals(offerUuid, that.offerUuid) &&
               Objects.equals(salespersonUuid, that.salespersonUuid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(offerUuid, salespersonUuid);
    }
}