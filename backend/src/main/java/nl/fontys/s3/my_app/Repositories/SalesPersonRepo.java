package nl.fontys.s3.my_app.Repositories;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.SalesPerson;

@Repository
public interface SalesPersonRepo extends JpaRepository<SalesPerson, Long> {
    public Optional<SalesPerson> findByUuid(String uuid);
    List<SalesPerson> findAllByUuidIn(Collection<String> uuids);
    
}
