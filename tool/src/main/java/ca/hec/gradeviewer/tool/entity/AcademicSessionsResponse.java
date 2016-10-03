package ca.hec.gradeviewer.tool.entity;

import java.util.List;

import ca.hec.gradeviewer.entity.AcademicSession;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AcademicSessionsResponse {
	public List<AcademicSession> academicSessions;
}
