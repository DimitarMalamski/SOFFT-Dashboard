package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import nl.fontys.s3.my_app.models.ids.SalesOfferDepotId;

@Entity
@Table(name = "sales_offer_depot", schema = "dbo")
public class SalesOfferDepot {

    @EmbeddedId
    private SalesOfferDepotId id;

    public SalesOfferDepot() {
    }

    public SalesOfferDepot(String offerUuid, Integer depotId) {
        this.id = new SalesOfferDepotId(offerUuid, depotId);
    }

    public SalesOfferDepotId getId() {
        return id;
    }

    public String getOfferUuid() {
        return id != null ? id.getOfferUuid() : null;
    }

    public Integer getDepotId() {
        return id != null ? id.getDepotId() : null;
    }

    public void setSalesOfferUuid(String offerUuid) {
        if (id == null) {
            id = new SalesOfferDepotId();
        }
        id = new SalesOfferDepotId(offerUuid, id.getDepotId());
    }

    public void setDepotId(Integer depotId) {
        if (id == null) {
            id = new SalesOfferDepotId();
        }
        id = new SalesOfferDepotId(id.getOfferUuid(), depotId);
    }
}
