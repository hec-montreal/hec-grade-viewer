package ca.hec.gradeviewer.impl;

import ca.hec.gradeviewer.api.Assignment;

public class AssignmentImpl implements Assignment {

	private String id;
	private String name;
	private double points;

	public AssignmentImpl(org.sakaiproject.service.gradebook.shared.Assignment assignment) {
		this.id = assignment.getId().toString();
		this.name = assignment.getName();
		this.points = assignment.getPoints();
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
	public double getPoints() {
		return points;
	}
}
