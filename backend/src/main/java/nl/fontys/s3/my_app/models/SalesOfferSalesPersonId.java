package nl.fontys.s3.my_app.models;

import java.io.Serializable;
import java.util.Objects;

public class SalesOfferSalesPersonId implements Serializable {
    private String offerUuid;
    private String salesPersonUuid; // must match the entity field name exactly

    public SalesOfferSalesPersonId() {}

    public SalesOfferSalesPersonId(String offerUuid, String salesPersonUuid) {
        this.offerUuid = offerUuid;
        this.salesPersonUuid = salesPersonUuid;
    }

    public String getOfferUuid() { return offerUuid; }
    public void setOfferUuid(String offerUuid) { this.offerUuid = offerUuid; }

    public String getSalesPersonUuid() { return salesPersonUuid; }
    public void setSalesPersonUuid(String salesPersonUuid) { this.salesPersonUuid = salesPersonUuid; }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SalesOfferSalesPersonId that)) return false;
        return Objects.equals(offerUuid, that.offerUuid)
            && Objects.equals(salesPersonUuid, that.salesPersonUuid);
    }
    @Override public int hashCode() {
        return Objects.hash(offerUuid, salesPersonUuid);
    }
}
