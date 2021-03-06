package eu.mhutti1.healthchain.constants;

import org.json.JSONObject;

import static org.hyperledger.indy.sdk.ledger.Ledger.buildSchemaRequest;

/**
 * Created by jedraz on 24/10/2018.
 */
public class HealthRecord {

  private static HealthRecordAttributesStandard healthRecordAttributes = new HealthRecordAttributesStandard();
  //private static HealthRecordAttributesLegacy healthRecordAttributes = new HealthRecordAttributesLegacy();
  private static String schemaDataJSON;

  public static void setHealthRecordFormat(HealthRecordAttributesStandard atts) {
    healthRecordAttributes = atts;
  }

  public static String getSchemaDataJSON() {
    if(schemaDataJSON == null) {
      schemaDataJSON = createSchemaDataJSON();
      System.out.println("Schema: " + schemaDataJSON);
    }
    return schemaDataJSON;
  }

  public static String getSchemaDataId() {
    return healthRecordAttributes.schemaId;
  }

  private static String createSchemaDataJSON() {
    System.out.println("\nBuild the SCHEMA request to add new schema to the ledger as a Steward\n");
    String name = healthRecordAttributes.name;
    String version = healthRecordAttributes.version;
    String attributes = healthRecordAttributes.attributes;
    String id = healthRecordAttributes.schemaId;
    System.out.println(attributes + "n");
    return new JSONObject("{\"name\":\"" + name + "\",\"version\":\"" + version + "\",\"attrNames\":" + attributes + ",\"ver\":\"" + version + "\",\"id\":\"" + id + "\"}").toString();
  }

  public static String[] attrs = healthRecordAttributes.attrs;
}
