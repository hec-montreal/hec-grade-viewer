package ca.hec.gradeviewer.entity;

public interface Assignment {

	public String getId();

	public String getName();

	public long getDate();

	public String getCategoryId();

	public String getCategoryName();

	public String getFormattedDate();

	public double getPoints();

	public Grade getGrade();

	public void setGrade(Grade grade);
}
