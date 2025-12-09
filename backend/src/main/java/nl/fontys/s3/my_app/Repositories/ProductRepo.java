package nl.fontys.s3.my_app.Repositories;

import nl.fontys.s3.my_app.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    List<Product> findAllByIdIn(Collection<Integer> ids);

    @Query("""
        SELECT p, ps, a, d
        FROM Product p
        LEFT JOIN ProductSeller ps ON ps.id = p.id
        LEFT JOIN Address a ON a.uuid = ps.addressUuid
        LEFT JOIN Depot d ON d.id = ps.depotId
        WHERE 
            (:name IS NULL OR p.brand LIKE CONCAT('%', :name, '%')
                            OR p.model LIKE CONCAT('%', :name, '%'))
        AND (:classType IS NULL OR p.productType = :classType)
        AND (:color IS NULL OR p.color = :color)
    """)
    Page<Object[]> searchProductsPagedJoined(
            @Param("name") String name,
            @Param("classType") String classType,
            @Param("color") String color,
            Pageable pageable
    );
}

