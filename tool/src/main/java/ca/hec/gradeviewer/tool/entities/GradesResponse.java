package ca.hec.gradeviewer.tool.entities;

import java.util.List;

import ca.hec.gradeviewer.api.AssignmentWithGrade;
import lombok.Data;

@Data
public class GradesResponse {

	private String userId;
	private List<AssignmentWithGrade> assignments;
}
