package ca.hec.gradeviewer.tool.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Assignment {

	private String id;
	private String name;
	private double points;
	private String grade;

	public Assignment(org.sakaiproject.service.gradebook.shared.Assignment assignment) {
		id = assignment.getId().toString();
		name = assignment.getName();
		points = assignment.getPoints();
	}
}
