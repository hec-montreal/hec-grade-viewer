package ca.hec.gradeviewer.entity;

public interface Grade {

	public Double getValue();

	public String getFormattedValue();

	public String getLetter();

	public boolean isNull();

	public String getComment();

	public boolean isPublished();
}
