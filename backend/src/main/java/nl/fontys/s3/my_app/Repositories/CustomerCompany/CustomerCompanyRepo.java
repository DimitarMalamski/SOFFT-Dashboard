package nl.fontys.s3.my_app.Repositories.CustomerCompany;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.CustomerCompany;

@Repository
public interface CustomerCompanyRepo extends JpaRepository<CustomerCompany, Long> {

}
