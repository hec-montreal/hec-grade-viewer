package ca.hec.gradeviewer.impl;

import ca.hec.gradeviewer.api.Assignment;
import ca.hec.gradeviewer.api.AssignmentWithGrade;
import ca.hec.gradeviewer.api.Grade;

public class AssignmentWithGradeImpl implements AssignmentWithGrade {

	private Assignment assignment;
	private Grade grade;

	public AssignmentWithGradeImpl(Assignment assignment, Grade grade) {
		this.assignment = assignment;
		this.grade = grade;
	}

	@Override
	public Assignment getAssignment() {
		return assignment;
	}

	@Override
	public Grade getGrade() {
		return grade;
	}
}
