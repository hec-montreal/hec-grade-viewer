package ca.hec.gradeviewer.tool.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public abstract class ServiceResponse {

	private int errorCode;
}
