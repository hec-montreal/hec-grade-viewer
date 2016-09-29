package ca.hec.gradeviewer.tool.entity;

import java.util.List;

import ca.hec.gradeviewer.entity.Course;
import ca.hec.gradeviewer.entity.User;
import lombok.Data;

@Data
public class GradesResponse {

	private User user;
	private List<Course> courses;
}
