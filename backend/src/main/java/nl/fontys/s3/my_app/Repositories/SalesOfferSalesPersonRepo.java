package nl.fontys.s3.my_app.Repositories;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.SalesOfferSalesPerson;

@Repository
public interface SalesOfferSalesPersonRepo extends JpaRepository<SalesOfferSalesPerson, Long> {
    List<SalesOfferSalesPerson> findByOfferUuid(String salesOfferUuid);
    List<SalesOfferSalesPerson> findBySalesPersonUuid(String salesPersonUuid);
    List<SalesOfferSalesPerson> findAllByOfferUuidIn(Collection<String> offerUuids);

    
}
