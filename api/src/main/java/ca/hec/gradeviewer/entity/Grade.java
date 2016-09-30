package ca.hec.gradeviewer.entity;

public interface Grade {

	public String getValue();

	public String getFormattedValue();

	public boolean isNull();

	public String getComment();

	public boolean isPublished();
}
