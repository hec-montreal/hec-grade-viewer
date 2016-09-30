package ca.hec.gradeviewer.entity;

public class UserImpl implements User {

	private String id;
	private String matricule;
	private String fullName;

	public UserImpl(org.sakaiproject.user.api.User user) {
		this.id = user.getId();
		this.matricule = user.getEid();
		this.fullName = user.getDisplayName();
	}

	@Override
	public String getId() {
		return id;
	}

	@Override
	public String getMatricule() {
		return matricule;
	}

	@Override
	public String getFullName() {
		return fullName;
	}
}
