package nl.fontys.s3.my_app.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.SalesPerson;

@Repository
public interface SalesPersonRepo extends JpaRepository<SalesPerson, Long> {

}
