package ca.hec.gradeviewer.entity;

import lombok.Getter;

@Getter
public class UserImpl implements User {

	private String id;
	private String matricule;
	private String fullName;

	public UserImpl(org.sakaiproject.user.api.User user) {
		this.id = user.getId();
		this.matricule = user.getEid();
		this.fullName = user.getDisplayName();
	}
}
