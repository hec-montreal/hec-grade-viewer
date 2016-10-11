package ca.hec.gradeviewer.entity;

import java.util.List;

import org.sakaiproject.service.gradebook.shared.CourseGrade;

public interface Course {

	public String getId();

	public String getTitle();

	public String getDescription();

	public AcademicSession getSession();

	public String getNumber();

	public List<Assignment> getAssignments();

	public String getCourseGrade();

	void setCourseGrade(CourseGrade courseGrade);
}
