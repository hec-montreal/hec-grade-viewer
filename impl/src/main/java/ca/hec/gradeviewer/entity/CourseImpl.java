package ca.hec.gradeviewer.entity;

import java.util.ArrayList;
import java.util.List;

import ca.hec.gradeviewer.util.StringUtil;

public class CourseImpl implements Course {

	private String id;
	private String title;
	private String description;
	private String session;
	private List<Assignment> assignments;

	public CourseImpl(org.sakaiproject.site.api.Site site) {
		this.assignments = new ArrayList<>();

		this.id = site.getId();
		this.title = site.getTitle();
		this.description = StringUtil.valOrEmptyString(site.getProperties().getProperty("title"));
		this.session = StringUtil.valOrEmptyString(site.getProperties().getProperty("term"));
	}

	public String getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	@Override
	public String getDescription() {
		return description;
	}

	public String getSession() {
		return session;
	}

	@Override
	public List<Assignment> getAssignments() {
		return assignments;
	}
}
