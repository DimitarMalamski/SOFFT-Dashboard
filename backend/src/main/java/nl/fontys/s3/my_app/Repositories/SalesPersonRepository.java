package nl.fontys.s3.my_app.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.model.SalesPerson;

@Repository
public interface SalesPersonRepository extends JpaRepository<SalesPerson, Long> {

}
