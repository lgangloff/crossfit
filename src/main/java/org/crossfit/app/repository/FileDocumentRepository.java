package org.crossfit.app.repository;

import org.crossfit.app.domain.FileDocument;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the FileDocument entity.
 */
public interface FileDocumentRepository extends JpaRepository<FileDocument,Long> {

}
