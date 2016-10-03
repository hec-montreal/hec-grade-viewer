package ca.hec.gradeviewer.entity;

import java.util.List;

public interface Course {

	public String getId();

	public String getTitle();

	public String getDescription();

	public AcademicSession getSession();

	public List<Assignment> getAssignments();
}
