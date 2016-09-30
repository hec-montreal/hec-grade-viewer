package ca.hec.gradeviewer.entity;

import java.util.List;

public interface Course {

	public String getId();

	public String getTitle();

	public String getDescription();

	public String getSession();

	public List<Assignment> getAssignments();
}
