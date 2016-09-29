package ca.hec.gradeviewer.entity;

import java.util.Date;

import ca.hec.gradeviewer.util.DateUtil;

public class AssignmentImpl implements Assignment {

	private String id;
	private String name;
	private Date date;
	private String categoryId;
	private String categoryName;
	private double points;
	private Grade grade;

	public AssignmentImpl(org.sakaiproject.service.gradebook.shared.Assignment assignment) {
		this.id = assignment.getId().toString();
		this.name = assignment.getName();
		this.points = assignment.getPoints();
		this.date = assignment.getDueDate();
		this.categoryId = assignment.getCategoryId() == null ? "" : assignment.getCategoryId().toString();
		this.categoryName = assignment.getCategoryName();
	}

	@Override
	public String getId() {
		return id;
	}

	@Override
	public String getName() {
		return name;
	}

	@Override
	public Date getDate() {
		return date;
	}

	@Override
	public String getFormattedDate() {
		return DateUtil.formatDate(getDate());
	}

	@Override
	public String getCategoryId() {
		return categoryId;
	}

	@Override
	public String getCategoryName() {
		return categoryName;
	}

	@Override
	public double getPoints() {
		return points;
	}

	@Override
	public Grade getGrade() {
		return grade;
	}

	@Override
	public void setGrade(Grade grade) {
		this.grade = grade;
	}
}
