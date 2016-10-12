package ca.hec.gradeviewer.entity;

import java.util.List;

public interface Course {

	public String getId();

	public String getTitle();

	public String getDescription();

	public AcademicSession getSession();

	public String getNumber();

	public List<Assignment> getAssignments();

	public Grade getCourseGrade();

	void setCourseGrade(org.sakaiproject.service.gradebook.shared.CourseGrade courseGrade);
}
