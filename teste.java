public class Teste {

    private String id;
    private String name;
    private String password;
    private Boolean facil;
    private Integer idade;
    private Float peso;
    private Aluno aluno;
    private List<Role> roles;

    public User(String name, String password, List<Role> roles) {
        this.name = Objects.requireNonNull(name);
        this.password = this.encrypt(password);
        this.roles = Objects.requireNonNull(roles);
    }

    // Getters and Setters

   String encrypt(String password) {
       // encryption logic
   }
}