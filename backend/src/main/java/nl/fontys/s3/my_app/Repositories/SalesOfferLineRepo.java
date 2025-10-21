package nl.fontys.s3.my_app.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.SalesOfferLine;

@Repository
public interface SalesOfferLineRepo extends JpaRepository<SalesOfferLine, Long> {
    List<SalesOfferLine> findByOfferUuid(String offerUuid);
}
