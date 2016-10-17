package ca.hec.gradeviewer.tool.entity;

import java.util.List;

import ca.hec.gradeviewer.entity.Course;
import ca.hec.gradeviewer.entity.User;
import lombok.Getter;

@Getter
public class GradesResponse extends ServiceResponse {

	public static final int ERROR_OK = 0;
	public static final int ERROR_INVALID_USER = 1;

	private User user;
	private List<Course> courses;

	public GradesResponse(User user, List<Course> courses) {
		super(ERROR_OK);

		this.user = user;
		this.courses = courses;
	}

	public GradesResponse(int errorCode) {
		super(errorCode);

		this.user = null;
		this.courses = null;
	}
}
