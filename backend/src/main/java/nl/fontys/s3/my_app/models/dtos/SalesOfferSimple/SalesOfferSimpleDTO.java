package nl.fontys.s3.my_app.models.dtos.SalesOfferSimple;

import java.time.LocalDateTime;
import java.util.List;

public class SalesOfferSimpleDTO {
     private String uuid;
      private int status;
      private String referenceId;
      private LocalDateTime expiresAt;
      private LocalDateTime createdAt;
      private LocalDateTime updatedAt;
      private List<SalesPersonSimpleDTO> salesPerson;
      private List<SalesOfferLineSimpleDTO> salesOfferLine;

      public SalesOfferSimpleDTO() {
      }
      public SalesOfferSimpleDTO(String uuid, int status, String referenceId,
                                 LocalDateTime expiresAt, LocalDateTime createdAt,
                                 LocalDateTime updatedAt,
                                 List<SalesPersonSimpleDTO> salesPerson,
                                 List<SalesOfferLineSimpleDTO> salesOfferLine) {
          this.uuid = uuid;
          this.status = status;
          this.referenceId = referenceId;
          this.expiresAt = expiresAt;
          this.createdAt = createdAt;
          this.updatedAt = updatedAt;
          this.salesPerson = salesPerson;
          this.salesOfferLine = salesOfferLine;
      }

      public String getUuid() {
          return uuid;
      }
      public void setUuid(String uuid) {
          this.uuid = uuid;
      }
      public int getStatus() {
          return status;
      }
      public void setStatus(int status) {
          this.status = status;
      }
      public String getReferenceId() {
            return referenceId;
      }

      public void setReferenceId(String referenceId) {
            this.referenceId = referenceId;
      }

      public LocalDateTime getExpiresAt() {
            return expiresAt;
      }

      public void setExpiresAt(LocalDateTime expiresAt) {
            this.expiresAt = expiresAt;
      }

      public LocalDateTime getCreatedAt() {
            return createdAt;
      }

      public void setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
      }

      public LocalDateTime getUpdatedAt() {
            return updatedAt;
      }

      public void setUpdatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
      }

      public List<SalesPersonSimpleDTO> getSalesPerson() {
            return salesPerson;
      }

      public void setSalesPerson(List<SalesPersonSimpleDTO> salesPerson) {
            this.salesPerson = salesPerson;
      }

      public List<SalesOfferLineSimpleDTO> getSalesOfferLine() {
            return salesOfferLine;
      }

      public void setSalesOfferLine(List<SalesOfferLineSimpleDTO> salesOfferLine) {
            this.salesOfferLine = salesOfferLine;
      }
}